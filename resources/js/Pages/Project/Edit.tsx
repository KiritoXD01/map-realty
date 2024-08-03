import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Edit({ auth, project }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">{project.name}</h2>}
        >
        </AuthenticatedLayout>
    )
}
