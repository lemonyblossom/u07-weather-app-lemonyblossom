import sunIcon from '../assets/sun (2).png';
import moonIcon from '../assets/moon.png';

interface SunProgressProps {
   sunPosition: number;
   isDaytime: boolean;
}

const SunProgress: React.FC<SunProgressProps> = ({ sunPosition, isDaytime }) => {
   return (
      <div className="progress-wrapper flex flex-col w-1/2 md:h-full md:w-full md:justify-center">
         <div className="sun-progress flex relative mt-2 w-full h-full">
            <svg className="absolute inset-0 w-full h-full min-w-24 min-h-24" viewBox="0 0 100 100">
               <defs>
                  <linearGradient id="progressGradient" x1="0%" y1="30%">
                     <stop offset="0%" stopColor="#fffbd6" />
                     <stop offset="70%" stopColor="#FDC202" />
                     <stop offset="80%" stopColor="#F0A70A" />
                     <stop offset="95%" stopColor="#FF4242" />



                  </linearGradient>
                  <linearGradient id="frameGradient" x1="0%" y1="20%">
                     <stop offset="0%" stopColor="#99ccff" />
                     <stop offset="60%" stopColor="#6790e0" />
                     <stop offset="100%" stopColor="#1e40af" />


                  </linearGradient>
               </defs>
               {/* Frame */}
               <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  strokeWidth="6"
                  stroke="url(#frameGradient)"
                  strokeDasharray="251.2"
                  transform="rotate(93 50 50)"
               />
               {/* Progress */}
               {isDaytime && (
                  <circle
                     cx="50"
                     cy="50"
                     r="40"
                     fill="none"
                     strokeWidth="6"
                     stroke="url(#progressGradient)"
                     strokeLinecap="square"
                     strokeDasharray="251.2"
                     strokeDashoffset={251.2 - (251.2 * sunPosition) / 100}
                     transform="rotate(93 50 50)"
                  />
               )}

            </svg>
            <img
               className="progressIcon min-w-10 max-w-24 absolute top-0 left-0 right-0 bottom-0 m-auto"
               src={isDaytime ? sunIcon : moonIcon}
               alt={isDaytime ? 'Sun Icon' : 'Moon Icon'}
            />
         </div>
      </div>
   );
};

export default SunProgress;
