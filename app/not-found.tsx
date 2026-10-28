import Button from "@/components/Button";

export default function NotFound() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      <div className="grid-bg absolute inset-0" />
      <div className="orb orb-violet animate-float-a -right-40 top-0 h-[600px] w-[600px]" />
      <div className="container-x relative text-center">
        <p className="font-display text-[10rem] font-bold leading-none text-gradient sm:text-[16rem]">404</p>
        <h1 className="mt-4 font-display text-3xl font-semibold sm:text-5xl">This page took a wrong turn.</h1>
        <p className="mx-auto mt-4 max-w-md text-muted">
          The page you&apos;re looking for doesn&apos;t exist or has moved. Let&apos;s get you back on track.
        </p>
        <div className="mt-10 flex justify-center">
          <Button href="/">Back to home</Button>
        </div>
      </div>
    </section>
  );
}
