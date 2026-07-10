const references = [
    {
        id: "ref-entropy-source",
        index: 1,
        title: "Entropy sources",
        body: (
            <>
                In random generation, an entropy source is the noisy physical process
                being sampled, such as timing jitter, thermal noise, or other behavior
                an attacker cannot realistically predict.
            </>
        ),
        href: "https://csrc.nist.gov/pubs/sp/800/90/b/final",
        label: "NIST SP 800-90B: Entropy Sources Used for Random Bit Generation",
    },
    {
        id: "ref-intel-drng",
        index: 2,
        title: "RDRAND, RDSEED, and Intel DRNG",
        body: (
            <>
                The CPU instruction interface for Intel&apos;s hardware random generator.{" "}
                <code>RDRAND</code> returns generator output; <code>RDSEED</code> is
                aimed at seeding other generators.
            </>
        ),
        href: "https://www.intel.com/content/www/us/en/developer/articles/technical/intel-sdm.html",
        label: "Intel 64 and IA-32 Architectures Software Developer Manuals",
    },
    {
        id: "ref-drbg",
        index: 3,
        title: "DRBG",
        body: (
            <>
                A deterministic random bit generator turns a secret seed into a long
                stream of pseudorandom bits. Its output is only as trustworthy as its
                seed and reseeding strategy.
            </>
        ),
        href: "https://csrc.nist.gov/pubs/sp/800/90/a/r1/final",
        label: "NIST SP 800-90A Rev. 1: Deterministic Random Bit Generators",
    },
    {
        id: "ref-linux-rng-implementation",
        index: 4,
        title: "Linux RNG implementation",
        body: (
            <>
                The kernel source for the random subsystem. It is the place where{" "}
                <code>input_pool</code>, <code>base_crng</code>, per-CPU CRNGs,
                extraction, and reseeding meet.
            </>
        ),
        href: "https://github.com/torvalds/linux/blob/master/drivers/char/random.c",
        label: "Linux kernel: drivers/char/random.c",
    },
    {
        id: "ref-chacha20",
        index: 5,
        title: "ChaCha20",
        body: (
            <>
                A fast stream cipher. Linux uses the same primitive as a random-byte
                generator: a secret key goes in, pseudorandom blocks come out.
            </>
        ),
        href: "https://www.rfc-editor.org/rfc/rfc8439",
        label: "RFC 8439: ChaCha20 and Poly1305 for IETF Protocols",
    },
    {
        id: "ref-linux-random",
        index: 6,
        title: (
            <>
                <code>/dev/urandom</code> and <code>getrandom()</code>
            </>
        ),
        body: (
            <>
                The user-facing Linux interfaces for random bytes.{" "}
                <code>getrandom()</code> is the safer modern API because it avoids
                path and file-descriptor problems.
            </>
        ),
        href: "https://man7.org/linux/man-pages/man4/random.4.html",
        label: "random(4): Linux random and urandom manual page",
    },
    {
        id: "ref-sha1",
        index: 7,
        title: "SHA-1",
        body: (
            <>
                A 160-bit member of the Secure Hash Standard family. It is important
                history here because old Linux RNG extraction used a SHA-1 based
                construction.
            </>
        ),
        href: "https://csrc.nist.gov/pubs/fips/180-4/upd1/final",
        label: "NIST FIPS 180-4: Secure Hash Standard",
    },
    {
        id: "ref-blake2s",
        index: 8,
        title: "BLAKE2S",
        body: (
            <>
                The 32-bit-friendly flavor of BLAKE2. In the modern Linux RNG it acts
                as the one-way accumulator and extractor for mixed entropy.
            </>
        ),
        href: "https://www.rfc-editor.org/rfc/rfc7693",
        label: "RFC 7693: The BLAKE2 Cryptographic Hash and MAC",
    },
];

export function RandomnessReferences() {
    return (
        <section className="references" aria-labelledby="references-title">
            <div className="references-heading">
                <p>Further reading</p>
                <h2 id="references-title">References</h2>
            </div>
            <ol>
                {references.map((reference) => (
                    <li key={reference.id} id={reference.id} className="reference-card">
                        <span className="reference-index">[{reference.index}]</span>
                        <div>
                            <h3>{reference.title}</h3>
                            <p>{reference.body}</p>
                            <a
                                href={reference.href}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {reference.label}
                            </a>
                        </div>
                    </li>
                ))}
            </ol>
        </section>
    );
}
