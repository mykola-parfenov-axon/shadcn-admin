import { createLazyFileRoute } from '@tanstack/react-router'
import Organizations from '@/features/organizations'

export const Route = createLazyFileRoute('/_authenticated/organizations/')({
  component: Organizations,
})
