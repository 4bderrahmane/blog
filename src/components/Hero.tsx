import {HeroArt} from "@/components/HeroArt";
import {socialIcons} from "@/components/icons";
import {site} from "@/lib/site";

const x = site.socials.find((social) => social.type === "x");
const github = site.socials.find((social) => social.type === "github");

const XIcon = socialIcons.x;
const GitHubIcon = socialIcons.github;

const username = (url: string) => url.split("/").filter(Boolean).pop();

const PILL =
    "inline-flex items-center gap-1.5 rounded-full border border-border px-2.5 py-0.5 text-xs text-muted transition-colors hover:border-black hover:bg-black hover:text-white";

export function Hero() {
    return (
        <section className="flex w-full justify-center px-6 pt-16 pb-14 sm:pt-20">
            <div className="flex w-full flex-col items-center text-center">
                <HeroArt size={190}/>
                <h1 className="mt-4 font-display text-lg font-extrabold uppercase tracking-tight whitespace-nowrap text-foreground sm:text-xl">
                    {site.name}
                </h1>
                <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
                    {x && (
                        <a
                            href={x.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={PILL}
                        >
                            <XIcon className="h-3 w-3"/>
                            <span>@{x.label}</span>
                        </a>
                    )}
                    {github && (
                        <a
                            href={github.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={PILL}
                        >
                            <GitHubIcon className="h-3 w-3"/>
                            <span>{username(github.href)}</span>
                        </a>
                    )}
                </div>
            </div>
        </section>
    );
}
