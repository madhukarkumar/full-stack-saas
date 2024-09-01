import Image from 'next/image';
import { cn } from "@/lib/utils";
import { ComponentProps } from "@/types/ui";

export type LogoProps = ComponentProps<"div">;

export function Logo({ className, ...props }: LogoProps) {
  return (
    <div
      {...props}
      className={cn("flex items-center gap-2", className)}
    >
      <Image
        src="/images/robo-surfer-logo.jpeg"
        alt="Robo Surfer Logo"
        width={84}
        height={84}
        className="rounded-full"
      />
      <span className="proxima-nova text-2xl font-bold">
        Ride the Hype
      </span>
    </div>
  );
}
