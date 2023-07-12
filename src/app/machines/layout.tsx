export default function MachinesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <section id="Machines">
            <div className="container">{children}</div>
        </section>
    );
}
