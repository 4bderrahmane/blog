import {site} from "@/lib/site";
import {CubeLogo} from "@/components/CubeLogo";
import {SocialLinks} from "@/components/SocialLinks";

export function SiteFooter() {
    return (
        <footer className="w-full border-t border-border bg-background">
            <div
                className="flex min-h-[90px] w-full flex-col items-start justify-center gap-5 px-7 py-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                    <CubeLogo size={34} className="shrink-0"/>
                    <div className="flex flex-col gap-1.5">
                        <a
                            href={site.mainUrl}
                            className="font-display text-[14px] font-extrabold uppercase leading-none text-foreground"
                        >
                            {site.name}
                        </a>
                        <span className="text-[11px] leading-none text-muted">
                            © {new Date().getFullYear()} {site.name}
                        </span>
                    </div>
                </div>

                <SocialLinks variant="plain" className="gap-4 text-muted"/>
            </div>
        </footer>
    );
}
