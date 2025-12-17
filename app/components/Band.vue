<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'
import RAPIER from '@dimforge/rapier3d-compat'
import { MeshLine, MeshLineMaterial } from 'three.meshline'

const band = ref<THREE.Mesh>()
const card = ref<THREE.Group>()
const canvasRef = ref<HTMLCanvasElement>()
const width = ref(0)
const height = ref(0)

const vec = new THREE.Vector3()
const ang = new THREE.Vector3()
const dir = new THREE.Vector3()
const dragged = ref(false)
const draggedOffset = ref<THREE.Vector3 | null>(null)
const pointer = ref({ x: 0, y: 0 })
const cardReleased = ref(false)

const curve = new THREE.CatmullRomCurve3([
  new THREE.Vector3(),
  new THREE.Vector3(),
  new THREE.Vector3(),
  new THREE.Vector3(),
  new THREE.Vector3(),
])

let world: RAPIER.World | null = null
let fixedBody: RAPIER.RigidBody | null = null
let j1Body: RAPIER.RigidBody | null = null
let j2Body: RAPIER.RigidBody | null = null
let j3Body: RAPIER.RigidBody | null = null
let cardBody: RAPIER.RigidBody | null = null
let animationFrameId: number | null = null
let scene: THREE.Scene | null = null
let camera: THREE.PerspectiveCamera | null = null
let renderer: THREE.WebGLRenderer | null = null
let resizeObserver: ResizeObserver | null = null
let cardMesh: THREE.Mesh | null = null
let bandMaterialInstance: any = null
let startTime: number | null = null

const animate = () => {
  if (!world || !scene || !camera || !renderer) {
    animationFrameId = requestAnimationFrame(animate)
    return
  }

  if (startTime === null) {
    startTime = performance.now()
  }
  const elapsedTime = (performance.now() - startTime) / 1000

  if (cardBody && dragged.value) {
    cardBody.setBodyType(RAPIER.RigidBodyType.KinematicPositionBased, true)

    vec.set(
      (pointer.value.x / width.value) * 2 - 1,
      -(pointer.value.y / height.value) * 2 + 1,
      0.5
    )
    vec.unproject(camera)
    dir.copy(vec).sub(camera.position).normalize()
    vec.add(dir.multiplyScalar(camera.position.length()))

    if (draggedOffset.value) {
      cardBody.setNextKinematicTranslation({
        x: vec.x - draggedOffset.value.x,
        y: vec.y - draggedOffset.value.y,
        z: vec.z - draggedOffset.value.z,
      })
    }
  } else if (cardBody && !dragged.value) {
    if (cardBody.bodyType() === RAPIER.RigidBodyType.KinematicPositionBased) {
      cardBody.setBodyType(RAPIER.RigidBodyType.Dynamic, true)
    }
  }

  world.step()

  if (j1Body && j2Body && j3Body) {
    const j1Vel = j1Body.linvel()
    const j2Vel = j2Body.linvel()
    const j3Vel = j3Body.linvel()
    
    if (Math.abs(j1Vel.x) < 0.01 && Math.abs(j1Vel.y) < 0.01 && Math.abs(j1Vel.z) < 0.01) {
      j1Body.setLinvel({ x: 0, y: 0, z: 0 }, true)
    }
    if (Math.abs(j2Vel.x) < 0.01 && Math.abs(j2Vel.y) < 0.01 && Math.abs(j2Vel.z) < 0.01) {
      j2Body.setLinvel({ x: 0, y: 0, z: 0 }, true)
    }
    if (Math.abs(j3Vel.x) < 0.01 && Math.abs(j3Vel.y) < 0.01 && Math.abs(j3Vel.z) < 0.01) {
      j3Body.setLinvel({ x: 0, y: 0, z: 0 }, true)
    }
  }

  if (j3Body && j2Body && j1Body && fixedBody && cardBody) {
    const j3Pos = j3Body.translation()
    const j2Pos = j2Body.translation()
    const j1Pos = j1Body.translation()
    const fixedPos = fixedBody.translation()
    const cardPos = cardBody.translation()
    const cardRot = cardBody.rotation()

    if (card.value) {
      card.value.position.set(cardPos.x, cardPos.y, cardPos.z)
      
      const physicsQuat = new THREE.Quaternion(cardRot.x, cardRot.y, cardRot.z, cardRot.w)
      const yRotation = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), elapsedTime * 0.5)
      card.value.quaternion.copy(physicsQuat).multiply(yRotation)

      const cardAngvel = cardBody.angvel()
      ang.set(cardAngvel.x, cardAngvel.y, cardAngvel.z)
      const q = new THREE.Quaternion(cardRot.x, cardRot.y, cardRot.z, cardRot.w)
      const euler = new THREE.Euler().setFromQuaternion(q)
      cardBody.setAngvel({ x: ang.x, y: ang.y - euler.y * 0.1, z: ang.z }, true)
    }

    curve.points[0]!.set(cardPos.x, cardPos.y + 0.6 * 0.65 * 1.2, cardPos.z)
    curve.points[1]!.set(j3Pos.x, j3Pos.y, j3Pos.z)
    curve.points[2]!.set(j2Pos.x, j2Pos.y, j2Pos.z)
    curve.points[3]!.set(j1Pos.x, j1Pos.y, j1Pos.z)
    curve.points[4]!.set(fixedPos.x, fixedPos.y, fixedPos.z)

    if (band.value && band.value.geometry && 'setPoints' in band.value.geometry) {
      const points = curve.getPoints(32)
      const flatPoints: number[] = []
      points.forEach((point) => {
        flatPoints.push(point.x, point.y, point.z)
      })
      ;(band.value.geometry as any).setPoints(flatPoints)
    }
  }

  renderer.render(scene, camera)
  animationFrameId = requestAnimationFrame(animate)
}

onMounted(async () => {
  await RAPIER.init()

  if (!canvasRef.value) return

  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(35, 1, 0.1, 1000)
  renderer = new THREE.WebGLRenderer({ canvas: canvasRef.value, alpha: true })
  renderer.setClearColor(0x000000, 0)
  renderer.outputColorSpace = THREE.SRGBColorSpace
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.5

  const ambient = new THREE.AmbientLight(0xffffff, 2)
  scene.add(ambient)

  const key = new THREE.DirectionalLight(0xffffff, 3)
  key.position.set(2.5, 3.5, 5)
  scene.add(key)

  const fill = new THREE.DirectionalLight(0xffffff, 1.5)
  fill.position.set(-3.5, 2.0, 4)
  scene.add(fill)

  const getXOffset = () => {
    const normalizedX = (0.62 - 0.5) * 2
    return normalizedX * 2
  }

  const updateCameraPosition = () => {
    if (!camera) return
    const xOffset = getXOffset()
    const scale = 0.65
    camera.position.set(xOffset + 0.6 * scale, 0.5, 4.2)
    camera.lookAt(xOffset + 0.6 * scale, -0.2, 0)
  }

  const syncSize = () => {
    if (!canvasRef.value || !renderer || !camera) return
    const rect = canvasRef.value.getBoundingClientRect()
    const nextWidth = Math.max(100, Math.floor(rect.width) || 400)
    const nextHeight = Math.max(300, Math.floor(rect.height) || 300)

    width.value = nextWidth
    height.value = nextHeight

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    renderer.setSize(nextWidth, nextHeight, false)
    camera.aspect = nextWidth / nextHeight
    camera.updateProjectionMatrix()

    if (bandMaterialInstance?.resolution) {
      bandMaterialInstance.resolution.set(nextWidth, nextHeight)
    }

    updateCameraPosition()
  }

  syncSize()
  resizeObserver = new ResizeObserver(() => syncSize())
  resizeObserver.observe(canvasRef.value)

  world = new RAPIER.World({ x: 0.0, y: -7.81, z: 0.0 })

  const scale = 0.65
  const cardScale = 1.2
  const xOffset = getXOffset()

  const fixedBodyDesc = RAPIER.RigidBodyDesc.fixed().setTranslation(xOffset + 1.1 * scale, 2.0 * scale, 0)
  fixedBody = world.createRigidBody(fixedBodyDesc)

  const j1BodyDesc = RAPIER.RigidBodyDesc.dynamic()
    .setTranslation(xOffset, 1.12 * scale, 0.0)
    .setLinearDamping(4.0)
    .setAngularDamping(4.0)
  j1Body = world.createRigidBody(j1BodyDesc)
  world.createCollider(RAPIER.ColliderDesc.ball(0.056 * scale), j1Body)

  const j2BodyDesc = RAPIER.RigidBodyDesc.dynamic()
    .setTranslation(xOffset + 0.105 * scale, 0.63 * scale, 0.0)
    .setLinearDamping(4.0)
    .setAngularDamping(4.0)
  j2Body = world.createRigidBody(j2BodyDesc)
  world.createCollider(RAPIER.ColliderDesc.ball(0.056 * scale), j2Body)

  const j3BodyDesc = RAPIER.RigidBodyDesc.dynamic()
    .setTranslation(xOffset + 0.175 * scale, 0.14 * scale, 0.0)
    .setLinearDamping(4.0)
    .setAngularDamping(4.0)
  j3Body = world.createRigidBody(j3BodyDesc)
  world.createCollider(RAPIER.ColliderDesc.ball(0.056 * scale), j3Body)

  const ropeJoint1 = RAPIER.JointData.rope(
    0.5 * scale,
    new RAPIER.Vector3(0, 0, 0),
    new RAPIER.Vector3(0, 0, 0)
  )
  world.createImpulseJoint(ropeJoint1, fixedBody, j1Body, true)

  const ropeJoint2 = RAPIER.JointData.rope(
    0.5 * scale,
    new RAPIER.Vector3(0, 0, 0),
    new RAPIER.Vector3(0, 0, 0)
  )
  world.createImpulseJoint(ropeJoint2, j1Body, j2Body, true)

  const ropeJoint3 = RAPIER.JointData.rope(
    0.5 * scale,
    new RAPIER.Vector3(0, 0, 0),
    new RAPIER.Vector3(0, 0, 0)
  )
  world.createImpulseJoint(ropeJoint3, j2Body, j3Body, true)

  const cardBodyDesc = RAPIER.RigidBodyDesc.dynamic()
    .setTranslation(xOffset + 0.6 * scale, -1.0 * scale, 0.0)
    .setLinearDamping(3.5)
    .setAngularDamping(3.5)
  cardBody = world.createRigidBody(cardBodyDesc)
  world.createCollider(RAPIER.ColliderDesc.cuboid(0.4 * scale * cardScale, 4, 0.007 * scale), cardBody)

  const sphericalJoint = RAPIER.JointData.spherical(
    new RAPIER.Vector3(0, 0, 0),
    new RAPIER.Vector3(0, 0.65 * scale, 0)
  )
  world.createImpulseJoint(sphericalJoint, j3Body, cardBody, true)

  cardBody.applyImpulse({ x: 0.05 * scale, y: 0, z: 0.01 * scale }, true)
  cardReleased.value = true

  const bandLine = new MeshLine()
  const initialPoints = [xOffset + 0.6 * scale, 0.0, 0, xOffset + 0.175 * scale, 0.14 * scale, 0, xOffset + 0.105 * scale, 0.63 * scale, 0, xOffset, 1.12 * scale, 0, xOffset + 0.9 * scale, 2.0 * scale, 0]
  bandLine.setPoints(initialPoints)
  const bandMaterial = new MeshLineMaterial({
    color: new THREE.Color('#666666'),
    resolution: new THREE.Vector2(width.value, height.value),
    lineWidth: 0.03,
  })
  bandMaterialInstance = bandMaterial
  const bandMesh = new THREE.Mesh(bandLine, bandMaterial)
  band.value = bandMesh
  scene.add(bandMesh)

  const cardGroup = new THREE.Group()
  card.value = cardGroup

  const textureLoader = new THREE.TextureLoader()
  const cardTexture = textureLoader.load('/card.png')
  cardTexture.colorSpace = THREE.SRGBColorSpace

  const r = 0.050 * scale * cardScale
  const w = 0.8 * scale * cardScale
  const h = 1.2 * scale * cardScale
  const shape = new THREE.Shape()
  shape.moveTo(-w / 2 + r, -h / 2)
  shape.lineTo(w / 2 - r, -h / 2)
  shape.quadraticCurveTo(w / 2, -h / 2, w / 2, -h / 2 + r)
  shape.lineTo(w / 2, h / 2 - r)
  shape.quadraticCurveTo(w / 2, h / 2, w / 2 - r, h / 2)
  shape.lineTo(-w / 2 + r, h / 2)
  shape.quadraticCurveTo(-w / 2, h / 2, -w / 2, h / 2 - r)
  shape.lineTo(-w / 2, -h / 2 + r)
  shape.quadraticCurveTo(-w / 2, -h / 2, -w / 2 + r, -h / 2)

  const cardGeometry = new THREE.ExtrudeGeometry(shape, { depth: 0.02, bevelEnabled: false })
  cardGeometry.center()

  const uvAttr = cardGeometry.attributes.uv as THREE.BufferAttribute
  if (uvAttr) {
    for (let i = 0; i < uvAttr.count; i++) {
      const u = uvAttr.getX(i)
      const v = uvAttr.getY(i)
      uvAttr.setXY(i, (u + w / 2) / w, (v + h / 2) / h)
    }
    uvAttr.needsUpdate = true
  }

  const cardMaterial2 = new THREE.MeshStandardMaterial({
    map: cardTexture,
    metalness: 0.1,
    roughness: 0.4,
  })
  cardMesh = new THREE.Mesh(cardGeometry, cardMaterial2)
  cardGroup.add(cardMesh)
  scene.add(cardGroup)

  updateCameraPosition()

  const raycaster = new THREE.Raycaster()

  const handlePointerMove = (event: PointerEvent) => {
    if (canvasRef.value) {
      const rect = canvasRef.value.getBoundingClientRect()
      pointer.value.x = event.clientX - rect.left
      pointer.value.y = event.clientY - rect.top
    }
  }

  const handlePointerDown = (event: PointerEvent) => {
    if (!canvasRef.value || !camera || !cardMesh || !cardBody) return

    const rect = canvasRef.value.getBoundingClientRect()
    const mouse = new THREE.Vector2()
    mouse.x = ((event.clientX - rect.left) / width.value) * 2 - 1
    mouse.y = -((event.clientY - rect.top) / height.value) * 2 + 1

    raycaster.setFromCamera(mouse, camera)
    const intersects = raycaster.intersectObject(cardMesh, true)

    if (intersects.length > 0 && intersects[0]) {
      const intersectionPoint = intersects[0].point
      const cardTranslation = cardBody.translation()
      draggedOffset.value = new THREE.Vector3(
        intersectionPoint.x - cardTranslation.x,
        intersectionPoint.y - cardTranslation.y,
        intersectionPoint.z - cardTranslation.z
      )
      dragged.value = true
    }
  }

  const handlePointerUp = () => {
    dragged.value = false
    draggedOffset.value = null
  }

  canvasRef.value.addEventListener('pointermove', handlePointerMove)
  canvasRef.value.addEventListener('pointerdown', handlePointerDown)
  canvasRef.value.addEventListener('pointerup', handlePointerUp)

  animate()
})

onUnmounted(() => {
  if (animationFrameId !== null) {
    cancelAnimationFrame(animationFrameId)
  }

  if (resizeObserver) {
    resizeObserver.disconnect()
  }

  if (renderer) {
    renderer.dispose()
  }

  if (world) {
    world.free()
  }
})
</script>

<template>
  <canvas ref="canvasRef" class="w-full h-screen pointer-events-auto" />
</template>
