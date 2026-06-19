function SkeletonBlock({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded-[8px] bg-slate-200/80 ${className}`} />
}

function SkeletonHeader() {
  return (
    <header className="border-b border-slate-100 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <SkeletonBlock className="h-10 w-16" />
          <SkeletonBlock className="h-7 w-44" />
        </div>
        <div className="hidden items-center gap-3 md:flex">
          <SkeletonBlock className="h-10 w-72 rounded-full" />
          <SkeletonBlock className="size-10 rounded-full" />
          <SkeletonBlock className="size-10 rounded-full" />
        </div>
      </div>
    </header>
  )
}

function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="space-y-3">
          <SkeletonBlock className="aspect-square w-full rounded-[16px]" />
          <SkeletonBlock className="h-3 w-24" />
          <SkeletonBlock className="h-4 w-full" />
          <SkeletonBlock className="h-4 w-3/4" />
          <SkeletonBlock className="h-5 w-28" />
        </div>
      ))}
    </div>
  )
}

export function StorefrontSkeleton() {
  return (
    <main className="min-h-screen bg-[#fbfbfa] text-[#101322]">
      <SkeletonHeader />
      <div className="mx-auto max-w-7xl space-y-10 px-4 py-5">
        <section className="grid gap-4 lg:grid-cols-[1fr_330px]">
          <div className="grid min-h-[440px] items-center gap-8 rounded-[12px] border border-[#ececf1] bg-slate-100 p-6 md:grid-cols-[1fr_0.9fr] md:p-10">
            <div className="space-y-4">
              <SkeletonBlock className="h-6 w-28" />
              <SkeletonBlock className="h-12 w-72 md:w-96" />
              <SkeletonBlock className="h-4 w-full max-w-xl" />
              <SkeletonBlock className="h-4 w-4/5 max-w-lg" />
              <SkeletonBlock className="h-11 w-32" />
            </div>
            <SkeletonBlock className="mx-auto aspect-square w-full max-w-[280px] rounded-[12px] bg-white" />
          </div>
          <div className="rounded-[12px] bg-slate-900 p-5">
            <SkeletonBlock className="h-7 w-36 bg-white/20" />
            <SkeletonBlock className="mt-4 aspect-square w-full bg-white/15" />
            <SkeletonBlock className="mt-4 h-11 w-full bg-white/20" />
          </div>
        </section>

        {["Featured Phones", "Tech Accessories", "Trending Nepal Picks"].map((title) => (
          <section key={title} className="space-y-5 border-t border-slate-100 pt-10">
            <div className="flex items-end justify-between">
              <div className="space-y-2">
                <SkeletonBlock className="h-3 w-28" />
                <SkeletonBlock className="h-8 w-56" />
              </div>
              <SkeletonBlock className="hidden h-5 w-16 sm:block" />
            </div>
            <div className="flex gap-4 overflow-hidden pb-4">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="w-[180px] shrink-0 space-y-3 sm:w-[200px] lg:w-[220px]">
                  <SkeletonBlock className="aspect-square w-full rounded-[16px]" />
                  <SkeletonBlock className="h-4 w-full" />
                  <SkeletonBlock className="h-4 w-3/4" />
                  <SkeletonBlock className="h-5 w-28" />
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  )
}

export function ProductDetailSkeleton() {
  return (
    <main className="min-h-screen bg-[#fbfbfa] text-[#101322]">
      <SkeletonHeader />
      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="mb-6 flex items-center gap-2">
          <SkeletonBlock className="h-4 w-12" />
          <SkeletonBlock className="h-4 w-24" />
          <SkeletonBlock className="h-4 w-48" />
        </div>

        <section className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="grid gap-4 md:grid-cols-[80px_1fr]">
            <div className="order-2 flex gap-3 md:order-1 md:flex-col">
              {Array.from({ length: 5 }).map((_, index) => (
                <SkeletonBlock key={index} className="size-20 shrink-0" />
              ))}
            </div>
            <div className="order-1 rounded-[12px] border border-[#ececf1] bg-[#f5f5f6] p-5 md:order-2">
              <SkeletonBlock className="min-h-[420px] w-full bg-white" />
              <div className="mt-4 grid grid-cols-3 gap-2">
                <SkeletonBlock className="h-16 bg-white" />
                <SkeletonBlock className="h-16 bg-white" />
                <SkeletonBlock className="h-16 bg-white" />
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <SkeletonBlock className="h-5 w-40" />
            <SkeletonBlock className="h-10 w-full max-w-2xl" />
            <SkeletonBlock className="h-10 w-4/5 max-w-xl" />
            <SkeletonBlock className="h-4 w-full max-w-2xl" />
            <SkeletonBlock className="h-4 w-5/6 max-w-xl" />
            <SkeletonBlock className="h-10 w-48" />
            <div className="space-y-2">
              <SkeletonBlock className="h-4 w-28" />
              <div className="flex gap-2">
                <SkeletonBlock className="h-10 w-20" />
                <SkeletonBlock className="h-10 w-24" />
                <SkeletonBlock className="h-10 w-20" />
              </div>
            </div>
            <div className="rounded-[8px] border border-[#eeeeef] bg-white p-4">
              <SkeletonBlock className="h-5 w-24" />
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {Array.from({ length: 4 }).map((_, index) => (
                  <SkeletonBlock key={index} className="h-5 w-full" />
                ))}
              </div>
            </div>
            <div className="flex gap-3">
              <SkeletonBlock className="h-12 w-36" />
              <SkeletonBlock className="h-12 flex-1" />
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

export function ProductSectionSkeleton() {
  return (
    <main className="min-h-screen bg-[#fbfbfa] text-[#101322]">
      <SkeletonHeader />
      <div className="mx-auto max-w-7xl px-4 py-8">
        <section className="overflow-hidden rounded-[16px] border border-slate-100 bg-white shadow-sm">
          <div className="grid gap-6 p-6 md:grid-cols-[1fr_240px] md:p-8">
            <div className="space-y-4">
              <SkeletonBlock className="h-5 w-28" />
              <SkeletonBlock className="h-4 w-32" />
              <SkeletonBlock className="h-12 w-80" />
              <SkeletonBlock className="h-4 w-full max-w-2xl" />
              <SkeletonBlock className="h-4 w-4/5 max-w-xl" />
            </div>
            <div className="rounded-[12px] bg-[#101322] p-4">
              <SkeletonBlock className="h-5 w-full bg-white/15" />
              <SkeletonBlock className="mt-5 h-8 w-32 bg-white/20" />
            </div>
          </div>
          <div className="flex gap-2 border-t border-[#ececf1] bg-slate-50/50 px-6 py-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <SkeletonBlock key={index} className="h-10 w-28 shrink-0 bg-white" />
            ))}
          </div>
        </section>

        <div className="mt-8 grid gap-8 lg:grid-cols-[280px_1fr]">
          <aside className="space-y-6">
            <div className="rounded-[12px] border border-[#ececf1] bg-white p-5 shadow-sm">
              <SkeletonBlock className="h-5 w-28" />
              <SkeletonBlock className="mt-4 h-9 w-full" />
              <div className="mt-4 space-y-3">
                {Array.from({ length: 5 }).map((_, index) => (
                  <SkeletonBlock key={index} className="h-4 w-32" />
                ))}
              </div>
            </div>
            <div className="rounded-[12px] border border-[#ececf1] bg-white p-5 shadow-sm">
              <SkeletonBlock className="h-5 w-32" />
              <div className="mt-4 grid grid-cols-2 gap-2">
                <SkeletonBlock className="h-9" />
                <SkeletonBlock className="h-9" />
              </div>
            </div>
          </aside>
          <div className="space-y-4">
            <SkeletonBlock className="h-4 w-40" />
            <ProductGridSkeleton count={8} />
          </div>
        </div>
      </div>
    </main>
  )
}
