export default function BlogLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <section id="Blog">
            <div className="container">{children}</div>
        </section>
    );
}
