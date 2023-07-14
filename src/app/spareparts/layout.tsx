export default function SparePartsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <section id="SpareParts">
            <div className="container">{children}</div>
        </section>
    );
}
