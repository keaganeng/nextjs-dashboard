import Form from '@/app/ui/invoices/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchInvoiceById, fetchCustomers, fetchCategories } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Update Invoice',
};
 
export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const [invoice, customers, categories] = await Promise.all([
        fetchInvoiceById(id),
        fetchCustomers(),
        fetchCategories(),
    ]);

    if (!invoice) {
        notFound();
    }

    return (
        <main>
        <Breadcrumbs
            breadcrumbs={[
            { label: 'Invoices', href: '/dashboard/invoices' },
            {
                label: 'Edit Invoice',
                href: `/dashboard/invoices/${id}/edit`,
                active: true,
            },
            ]}
        />
        <Form invoice={invoice} customers={customers} categories={categories} />
        </main>
    );
}