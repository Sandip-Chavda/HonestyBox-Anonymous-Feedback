//------------------this code for every refresh confetti fire -------//

// "use client";

// import React, { useState, useEffect } from "react";
// import Confetti from "react-confetti";
// import { useWindowSize } from "react-use";

// const ConfettiComponent: React.FC = () => {
//   const { width, height } = useWindowSize();
//   const [isConfettiVisible, setConfettiVisible] = useState(true);

//   useEffect(() => {
//     // Hide the confetti after 5 seconds
//     const timer = setTimeout(() => {
//       setConfettiVisible(false);
//     }, 4000);

//     return () => clearTimeout(timer);
//   }, []);

//   return <>{isConfettiVisible && <Confetti width={1280} height={720} />}</>;
// };

// export default ConfettiComponent;

"use client";

import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

const ConfettiComponent: React.FC = () => {
  const { width, height } = useWindowSize();
  const [isConfettiVisible, setConfettiVisible] = useState(false);

  useEffect(() => {
    // Check if confetti has already been fired this session
    const hasFired = sessionStorage.getItem("confettiFired");

    if (!hasFired) {
      setConfettiVisible(true);
      sessionStorage.setItem("confettiFired", "true");

      // Hide the confetti after 4 seconds
      const timer = setTimeout(() => {
        setConfettiVisible(false);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, []);

  return <>{isConfettiVisible && <Confetti width={width} height={height} />}</>;
};

export default ConfettiComponent;
