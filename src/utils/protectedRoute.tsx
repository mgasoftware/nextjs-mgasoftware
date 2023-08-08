/* eslint-disable @typescript-eslint/no-floating-promises */
import { useEffect } from "react";
import { useRouter } from "next/router";

type Props = {
    children?: JSX.Element
}

const ProtectedRoute = ({ children }:Props) => {
    const router = useRouter();
    const isAuthenticated = localStorage.getItem("token")
  
    useEffect(() => {
      if (!isAuthenticated) {
        router.replace('/');
      }
    }, [isAuthenticated, router]);
  
    return isAuthenticated ? children : null;
  };
  
  export default ProtectedRoute;

// export default async function ProtectedRoute({ children }: Props) {
//     const ProtectedRoute = ({ children }) => {
//         const router = useRouter();
      
//         // Simulate authentication state, replace this with actual logic
//         const isAuthenticated = true; // Example, you need to implement proper authentication logic
      
//         useEffect(() => {
//           if (!isAuthenticated) {
//             router.replace('/login'); // Redirect to login page if not authenticated
//           }
//         }, [isAuthenticated]);
      
//         return isAuthenticated ? children : null;
//       };
      
//       export default ProtectedRoute;
// };