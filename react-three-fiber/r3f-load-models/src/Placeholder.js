const Placeholder = () => {
    return (
        <mesh position-y={0.5} scale={[2, 3, 2]}>
            <boxGeometry args={[1, 1, 1, 2, 2, 2]} />
            <meshBasicMaterial wireframe color="red" />
        </mesh>
    );
};

export default Placeholder;
