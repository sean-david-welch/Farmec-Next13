export default function SuppliersLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <section id="Suppliers">
            <div className="container">{children}</div>
        </section>
    );
}
