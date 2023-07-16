export default function AccountLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <section id="Account">
            <div className="container">{children}</div>
        </section>
    );
}
