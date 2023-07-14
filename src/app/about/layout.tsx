export default function AboutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <section id="About">
            <div className="container">{children}</div>
        </section>
    );
}
