export function BackdropBlur({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed left-0 right-0 top-0 z-50 flex min-h-screen items-center justify-center bg-zinc-800/30 backdrop-blur">
      {children}
    </div>
  )
}
