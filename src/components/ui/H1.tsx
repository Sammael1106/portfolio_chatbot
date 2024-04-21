import { classMerge } from "@/lib/utils"

export function H1(props: React.HTMLProps<HTMLHeadingElement>) {
  return <h1
    {...props}
    className={classMerge(
      "text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl",
      props.className
    )}
  />
}