import { useFrame } from "@react-three/fiber"
import { useRef, useState } from "react"
import { BoxGeometry } from "three"

function Box() {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef()
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => {
		((ref as any).current.rotation.x += 0.01);
		((ref as any).current.rotation.y += 0.01);
		((ref as any).current.rotation.z += 0.01);
		((ref as any).current.position.x += 0.01);
		((ref as any).current.position.y += 0.01);
		((ref as any).current.position.z += 0.01);
		return ref;
	})
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}
export default Box;