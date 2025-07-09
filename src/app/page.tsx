import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { MetallicShineText } from "@/components/MetallicShineText";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 lg:py-32">
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,hsl(var(--primary))_0%,transparent_50%)] opacity-[0.15]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,hsl(var(--secondary))_0%,transparent_50%)] opacity-[0.1]" />
        </div>

        <div className="container relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="flex flex-col justify-center space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                  <Sparkles className="h-4 w-4" />
                  Welcome to our platform
                </div>

                <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
                  Fullstack dev just want to make products.
                  {/* Responsive: bạn có thể truyền fontSize tương ứng (vd. 48, 60, 72, 80) */}
                  <MetallicShineText fontSize={72}>I am LGD</MetallicShineText>
                </h1>

                <p className="max-w-[600px] text-lg leading-relaxed text-muted-foreground md:text-xl">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Error, reiciendis? Ullam quos reprehenderit, voluptate cum
                  dignissimos assumenda sint, quod magnam officiis nostrum
                  aliquam debitis architecto. Veniam quis alias velit libero?
                </p>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
                <Link href="/projects">
                  <Button
                    size="lg"
                    className="group h-12 px-8 font-medium shadow-lg shadow-primary/25"
                  >
                    View My Projects
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </Button>
                </Link>
                <Link href="#">
                  <Button
                    variant="outline"
                    size="lg"
                    className="h-12 px-8 font-medium"
                  >
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative mx-auto hidden aspect-square w-full max-w-lg lg:block">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-primary/20 via-primary/5 to-transparent" />
              <div className="absolute -inset-4 rounded-2xl bg-gradient-to-r from-primary/10 to-secondary/10 blur-xl" />
              <div className="relative h-full overflow-hidden rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm">
                <Image
                  src="/images/anh-sang/1.jpg"
                  alt="Anh Sang AZA"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
