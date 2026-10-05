import { Feather } from "lucide-react";

export default function EmptyPosts() {
  return (
    <div className="relative isolate flex flex-col items-center overflow-hidden rounded-3xl border border-dashed px-6 py-20 text-center">
      <div className="absolute top-1/2 left-1/2 -z-10 size-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-linear-to-r from-brand-violet/15 via-brand-pink/10 to-brand-apricot/15 blur-3xl" />
      <div className="mb-5 grid size-14 place-items-center rounded-2xl bg-linear-to-br from-brand-violet via-brand-pink to-brand-apricot text-white shadow-lg shadow-brand-violet/25">
        <Feather className="size-6" />
      </div>
      <h2 className="text-2xl font-bold tracking-tight">
        Առաջին հոդվածը շուտով
      </h2>
      <p className="mt-3 max-w-md text-muted-foreground">
        Մենք արդեն գրում ենք։ Շուտով այստեղ կհայտնվեն հոդվածներ տեխնոլոգիաների և
        արհեստական բանականության մասին։
      </p>
    </div>
  );
}
