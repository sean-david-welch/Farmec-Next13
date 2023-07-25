export default function ServicesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <section id="Services">
            <div className="container">{children}</div>
        </section>
    );
}
