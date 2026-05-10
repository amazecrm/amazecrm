"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { 
  Users, 
  Target, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight,
  Zap,
  BarChart3,
  Calendar,
  Check
} from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold text-foreground">AmazeCRM</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Features
            </Link>
            <Link href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Pricing
            </Link>
            <Link href="/login">
              <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                Sign in
              </Button>
            </Link>
            <Link href="/login">
              <Button className="gap-2">
                Get Started <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm text-muted-foreground">
            <Sparkles className="h-4 w-4 text-primary" />
            Friend, good! Relationships, amaze!
          </div>
          <h1 className="mb-6 text-5xl font-bold tracking-tight text-foreground text-balance md:text-6xl">
            A CRM that actually helps you{" "}
            <span className="text-primary">build relationships</span>
          </h1>
          <p className="mb-8 text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
            AmazeCRM is a friendly, intuitive CRM that helps you manage contacts, 
            track deals, and stay on top of your activities. Simple. Collaborative. 
            Rocky approved.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/login">
              <Button size="lg" className="gap-2 text-base px-8">
                Start for free <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="gap-2 text-base px-8">
              Watch demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-6 py-16" id="features">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground">
              Everything you need. Nothing you don&apos;t.
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Built for teams who want to focus on relationships, not wrestling with software.
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={<Users className="h-6 w-6" />}
              title="Contact Management"
              description="Keep all your contacts organized with smart filtering, custom fields, and relationship tracking."
            />
            <FeatureCard
              icon={<Target className="h-6 w-6" />}
              title="Deal Pipeline"
              description="Visual kanban boards to track deals from discovery to close. Drag, drop, celebrate."
            />
            <FeatureCard
              icon={<Calendar className="h-6 w-6" />}
              title="Activity Tracking"
              description="Never miss a follow-up. Schedule calls, emails, and meetings with smart reminders."
            />
            <FeatureCard
              icon={<BarChart3 className="h-6 w-6" />}
              title="Real-time Analytics"
              description="Beautiful dashboards that show pipeline health, conversion rates, and revenue metrics."
            />
            <FeatureCard
              icon={<Zap className="h-6 w-6" />}
              title="Lightning Fast"
              description="Built for speed. No loading spinners, no lag. Just you and your data, instantly."
            />
            <FeatureCard
              icon={<CheckCircle2 className="h-6 w-6" />}
              title="Simple by Design"
              description="We removed the bloat. What remains is a tool that gets out of your way and lets you work."
            />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="px-6 py-16" id="pricing">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground">
              Simple, transparent pricing
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Start free, upgrade when you need more. No hidden fees, no surprises.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <PricingCard
              name="Starter"
              price="$0"
              description="Perfect for individuals just getting started"
              features={[
                "Up to 100 contacts",
                "Basic deal pipeline",
                "Email tracking",
                "Mobile app access",
              ]}
              buttonText="Start free"
              buttonVariant="outline"
            />
            <PricingCard
              name="Pro"
              price="$29"
              description="For growing teams that need more power"
              features={[
                "Unlimited contacts",
                "Advanced pipeline analytics",
                "Team collaboration",
                "API access",
                "Priority support",
                "Custom fields",
              ]}
              buttonText="Start free trial"
              buttonVariant="default"
              highlighted
            />
            <PricingCard
              name="Enterprise"
              price="$99"
              description="For large teams with advanced needs"
              features={[
                "Everything in Pro",
                "SSO authentication",
                "Advanced security",
                "Dedicated account manager",
                "Custom integrations",
                "SLA guarantee",
              ]}
              buttonText="Contact sales"
              buttonVariant="outline"
            />
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <Card className="border-border bg-card/50 backdrop-blur">
            <CardContent className="p-8 md:p-12">
              <div className="flex flex-col items-center text-center">
                <blockquote className="mb-6 text-xl text-foreground md:text-2xl text-pretty">
                  &ldquo;Finally, a CRM that doesn&apos;t make me want to throw my laptop out the window. 
                  It&apos;s like they actually talked to salespeople before building it.&rdquo;
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-lg font-semibold text-primary">RG</span>
                  </div>
                  <div className="text-left">
                    <div className="font-medium text-foreground">Ryland Grace</div>
                    <div className="text-sm text-muted-foreground">Chief Science Officer, Hail Mary Corp</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
            Ready to amaze your customers?
          </h2>
          <p className="mb-8 text-lg text-muted-foreground">
            Join thousands of teams building better relationships with AmazeCRM.
          </p>
          <Link href="/login">
            <Button size="lg" className="gap-2 text-base px-8">
              Get started free <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border px-6 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-primary">
              <Sparkles className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-medium text-foreground">AmazeCRM</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Made with curiosity and collaboration. Rocky would be proud.
          </p>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ 
  icon, 
  title, 
  description 
}: { 
  icon: React.ReactNode
  title: string
  description: string 
}) {
  return (
    <Card className="border-border bg-card/50 transition-colors hover:bg-card">
      <CardContent className="p-6">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
          {icon}
        </div>
        <h3 className="mb-2 text-lg font-semibold text-foreground">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}

function PricingCard({
  name,
  price,
  description,
  features,
  buttonText,
  buttonVariant = "default",
  highlighted = false,
}: {
  name: string
  price: string
  description: string
  features: string[]
  buttonText: string
  buttonVariant?: "default" | "outline"
  highlighted?: boolean
}) {
  return (
    <Card className={`border-border relative ${highlighted ? "border-primary bg-card shadow-lg" : "bg-card/50"}`}>
      {highlighted && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
            Most popular
          </span>
        </div>
      )}
      <CardContent className="p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-foreground">{name}</h3>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-4xl font-bold text-foreground">{price}</span>
            {price !== "$0" && <span className="text-muted-foreground">/month</span>}
          </div>
          <p className="mt-2 text-sm text-muted-foreground">{description}</p>
        </div>
        <ul className="mb-6 space-y-3">
          {features.map((feature) => (
            <li key={feature} className="flex items-center gap-2 text-sm text-foreground">
              <Check className="h-4 w-4 text-primary flex-shrink-0" />
              {feature}
            </li>
          ))}
        </ul>
        <Link href="/login">
          <Button variant={buttonVariant} className="w-full">
            {buttonText}
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}
