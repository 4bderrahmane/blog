import {site} from "@/lib/site";
import {socialIcons} from "@/components/icons";

type Variant = "pill" | "plain";

// Pill = bordered chip (hero); plain = icon-only (footer).
const STYLES: Record<Variant, string> = {
    pill: "inline-flex items-center justify-center rounded-full border border-border p-2 text-muted transition-colors hover:border-black hover:bg-black hover:text-white",
    // plain inherits the surrounding text color (muted in the footer).
    plain: "inline-flex opacity-70 transition-opacity hover:opacity-100",
};

export function SocialLinks({
                                variant = "pill",
                                className = "",
                            }: Readonly<{
    variant?: Variant;
    className?: string;
}>) {
    return (
        <ul className={`flex flex-wrap items-center justify-center gap-2 ${className}`}>
            {site.socials.map((social) => {
                const Icon = socialIcons[social.type];
                return (
                    <li key={social.href}>
                        <a
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={social.label}
                            className={STYLES[variant]}
                        >
                            <Icon className={variant === "pill" ? "h-4 w-4" : "h-5 w-5"}/>
                        </a>
                    </li>
                );
            })}
        </ul>
    );
}
