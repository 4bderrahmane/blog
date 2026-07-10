import {CubeLogo} from "@/components/CubeLogo";
import {site} from "@/lib/site";

// Shared brand header (square + name) in normal page flow. Plain <a> because in
// production the home is a cross-origin apex.
export function SiteHeader() {
    return (
        <header className="flex w-full items-center px-6 pt-8 pb-2">
            <a
                href={site.mainUrl}
                className="flex items-center gap-2.5 font-display text-[13px] font-extrabold uppercase tracking-tight leading-none text-foreground"
            >
                <CubeLogo size={26} className="shrink-0"/>
                <span>{site.name}</span>
            </a>
        </header>
    );
}
