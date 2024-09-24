import { getCategories } from '@/server/actions/categories'
import { DeleteDialog, DrawerCategory } from './drawer'
import Link from 'next/link'

export default async function Categories() {
  const categories = await getCategories()
  return (
    <main className="container">
      <Link
        href={{
          query: {
            create: 'category',
          },
        }}
      >
        Create category
      </Link>
      <div className="flex flex-col">
        {categories.map((category) => (
          <div key={category.id}>
            <span>
              {category.description} - {category.type} -{' '}
            </span>
            <Link
              href={{
                query: {
                  create: 'category',
                  data: encodeURI(JSON.stringify(category)),
                },
              }}
            >
              Edit
            </Link>
            {' - '}
            <DeleteDialog categoryId={category.id} />
          </div>
        ))}
      </div>
      <DrawerCategory />
    </main>
  )
}
