"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles, ArrowLeft } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleDemoAccess = async () => {
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 800))
    router.push("/dashboard")
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      {/* Back to landing */}
      <Link 
        href="/" 
        className="absolute left-6 top-6 flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </Link>

      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 flex flex-col items-center">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
            <Sparkles className="h-7 w-7 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-semibold text-foreground">AmazeCRM</h1>
          <p className="text-muted-foreground">Friend, good! Welcome back.</p>
        </div>

        <Card className="border-border bg-card">
          <CardHeader className="text-center">
            <CardTitle role="heading" aria-level={2} className="text-xl">
              Explore the demo
            </CardTitle>
            <CardDescription>
              No account or password required. Jump into a ready-to-use CRM workspace.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              className="h-11 w-full"
              onClick={handleDemoAccess}
              disabled={isLoading}
            >
              {isLoading ? "Opening demo..." : "Open demo workspace"}
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              Demo data is included so you can explore contacts, deals, and activities right away.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
