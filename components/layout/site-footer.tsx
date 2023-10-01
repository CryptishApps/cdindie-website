export function SiteFooter() {
  return (
    <footer className="py-6 md:py-0">
      <div className="flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          Built by{" "}
          <a
            href="https://x.com/cryptish_"
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            @cryptish
          </a>
        </p>
      </div>
    </footer>
  )
}