'use client'

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs"
import { FaSignInAlt } from "react-icons/fa"
import { useState, useEffect } from "react"
import Spinner from "../shared/Spinner"

const HeaderButtons = () => {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return <Spinner />
    }

    return (
        <div className="flex items-center">
            <SignedOut>
                <SignInButton
                    signUpForceRedirectUrl='/generateRefId'
                    mode="modal"
                >
                    <button
                        type="button"
                        className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-xl px-4 py-2 shadow-md hover:shadow-lg transition-all duration-200 font-medium"
                    >
                        <FaSignInAlt className="text-sm" />
                        Sign In
                    </button>
                </SignInButton>
            </SignedOut>
            <SignedIn>
                <UserButton
                    appearance={{
                        elements: {
                            avatarBox: "w-10 h-10 ring-2 ring-blue-500/30 ring-offset-2 ring-offset-white dark:ring-offset-slate-900 rounded-full"
                        }
                    }}
                />
            </SignedIn>
        </div>
    )
}

export default HeaderButtons
