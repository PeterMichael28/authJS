import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LoginButton } from "./auth/_components/login-button";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"]
})

export default function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-400 to-slate-800">
      <div className="space-y-6 text-center px-3">
        <h1 className={cn(
          "md:text-6xl text-3xl  font-semibold text-white drop-shadow-md",
          font.className,
        )}>
           AuthJs Tutorial
        </h1>
        <p className="text-white text-lg">
          New AuthJs test app that covers all basic type of Authentication including 2 Factor Auth
        </p>
        <div>
          <LoginButton  asChild>
            <Button variant="secondary" size="lg">
              Sign in
            </Button>
          </LoginButton>
        </div>
      </div>
    </main>
  )
}
