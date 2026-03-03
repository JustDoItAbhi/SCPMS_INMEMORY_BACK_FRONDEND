// import { useCallback } from "react";
// import Particles from "react-tsparticles";
// import { loadFull } from "tsparticles";

// const GalaxyBackground = () => {
//   const particlesInit = useCallback(async (engine) => {
//     await loadFull(engine);
//   }, []);

//   return (
//     <Particles
//       id="tsparticles"
//       init={particlesInit}
//       options={{
//         background: { color: "#000" },
//         particles: {
//           number: { value: 200 },
//           color: { value: "#ffffff" },
//           move: {
//             enable: true,
//             speed: 0.5,
//             direction: "none",
//             random: true,
//           },
//           size: { value: 2 },
//           opacity: { value: 0.7 },
//           links: { enable: false },
//         },
//         interactivity: {
//           events: {
//             onHover: { enable: true, mode: "repulse" },
//           },
//         },
//       }}
//    style={{ position: "fixed", top: 0, left: 0, zIndex: -1 }}

//     />
//   );
// };

// export default GalaxyBackground;
