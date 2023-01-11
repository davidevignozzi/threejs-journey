const BlockStart = () => {
    return (
        <mesh position={[0, -0.1, 0]} receiveShadow>
            <boxGeometry args={[4, 0.2, 4]} />
            <meshStandardMaterial color="limegreen" />
        </mesh>
    );
};

const Level = () => {
    return (
        <>
            <BlockStart />
        </>
    );
};

export default Level;
