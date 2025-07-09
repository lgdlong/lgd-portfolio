import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProjectCardProps } from "@/types/project";

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="flex flex-row items-stretch w-full max-w-2xl shadow-lg shadow-primary/15">
      {/* Ảnh Preview */}
      <div className="w-48 min-w-[12rem]">
        <Image
          src={project.image}
          alt={project.name}
          width={384} // original=1920
          height={240} // original=1080
          className="object-cover h-full rounded-l-2xl"
          quality={100}
          priority
        />
      </div>
      {/* Thông tin dự án */}
      <CardContent className="flex flex-col justify-between py-4 px-6 flex-1">
        <div>
          <h3 className="text-lg font-semibold mb-2">{project.name}</h3>
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
            {project.description}
          </p>
        </div>
        <div className="flex gap-3 mt-2">
          <Button asChild variant="outline" size="sm">
            <Link
              href={project.website}
              target="_blank"
              rel="noopener noreferrer"
            >
              Website
            </Link>
          </Button>
          <Button asChild variant="ghost" size="sm">
            <Link
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
