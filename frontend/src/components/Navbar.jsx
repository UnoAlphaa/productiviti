import { Link } from "react-router";
import { SignInButton, SignUpButton, UserButton, useAuth } from "@clerk/clerk-react";
import { ShoppingBagIcon, PlusIcon, UserIcon } from "lucide-react";
import ThemeSelector from "./ThemeSelector";

function Navbar() {
    const {isSignedIn} = useAuth();
  return (
    <div className="navbar bg-base-300">
        <div className="max-w-5xl mx-auto w-full px-4 flex justify-between items-center">
            {/* Left hand side */}
            <div className="flex-1">
                <Link to="/" className="btn btn-ghost gap-2">
                    <ShoppingBagIcon className="size-5 text-primary" />
                    <span className="text-xl font-extrabold font-mono uppercase tracking-wider">Productiviti</span>
                </Link>
            </div>

            {/* Right hand side of the navigation bar */}
            <div className="flex gap-2 items-center">
                <ThemeSelector /> 
                
                {isSignedIn ? (
                    <>
                    <Link to="/create" className="btn btn-primary gap-1 btn-sm">
                        <PlusIcon className="size-4" />
                        <span className="hidden sm:inline">New Product</span>
                    </Link>
                    <Link to="/profile" className="btn btn-ghost gap-1 btn-sm">
                        <UserIcon className="size-4" />
                        <span className="hidden sm:inline">Profile</span>
                    </Link>
                    <UserButton />
                    </>
                ) : (
                    <>
                    <SignInButton mode="modal">
                        <button className="btn btn-ghost btn-sm">Sign In</button>
                    </SignInButton>
                    <SignUpButton mode="modal" >
                        <button className="btn btn-primary text-white btn-sm">Get Started</button>
                    </SignUpButton>
                    </>
                )}
            </div>

        </div>
    </div>
  )
}

export default Navbar