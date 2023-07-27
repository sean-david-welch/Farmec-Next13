export default function PaymentsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <section id="Payments">
            <div className="container">{children}</div>
        </section>
    );
}
