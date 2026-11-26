import { useState } from 'react'
import {
  DeleteShoppingListItemModal,
  ShoppingListItemModal,
  ShoppingListItems,
  ShoppingListSummary,
  StoreComparison,
  type ShoppingListItem,
  type ShoppingListItemDetails,
  useSampleShoppingList,
  useShoppingStoreParam,
} from '@/modules/shoppingList'
import PlusIcon from '@/shared/assets/icon/Plus.svg?react'
import { IconButton } from '@/shared/components/Button/IconButton'
import { cn } from '@/shared/utils/cn'
import { Header } from '@/shared/widgets/Header/Header'

export const ShoppingListPage = () => {
  const list = useSampleShoppingList()
  const [store, setStore] = useShoppingStoreParam()
  const [formItem, setFormItem] = useState<ShoppingListItem | null>(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [deletingItem, setDeletingItem] = useState<ShoppingListItem | null>(null)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)

  const showOverview = !list.isError && (list.isLoading || list.data.length > 0)

  const openAdd = () => {
    setFormItem(null)
    setIsFormOpen(true)
  }

  const openEdit = (item: ShoppingListItem) => {
    setFormItem(item)
    setIsFormOpen(true)
  }

  const openDelete = (item: ShoppingListItem) => {
    setDeletingItem(item)
    setIsDeleteOpen(true)
  }

  const handleSave = (details: ShoppingListItemDetails) => {
    if (formItem) {
      list.updateItem(formItem.id, details)
    } else {
      list.addItem(details)
    }

    setIsFormOpen(false)
  }

  const handleDelete = (id: string) => {
    list.deleteItem(id)
    setIsDeleteOpen(false)
  }

  return (
    <>
      <Header
        title="Shopping list"
        actions={
          <IconButton
            icon={<PlusIcon aria-hidden />}
            text="Add"
            tooltip="Add item"
            onClick={openAdd}
          />
        }
      />
      {showOverview && (
        <ShoppingListSummary
          className="mt-4"
          items={list.data}
          store={store}
          isLoading={list.isLoading}
        />
      )}
      <div className="mt-4 grid items-start gap-4 lg:grid-cols-3">
        {showOverview && (
          <StoreComparison
            className="lg:col-start-3 lg:row-start-1"
            items={list.data}
            selectedStore={store}
            onStoreChange={setStore}
            isLoading={list.isLoading}
          />
        )}
        <ShoppingListItems
          className={cn(
            'lg:col-start-1 lg:row-start-1',
            showOverview ? 'lg:col-span-2' : 'lg:col-span-3',
          )}
          items={list.data}
          store={store}
          isLoading={list.isLoading}
          isError={list.isError}
          onRetry={list.refetch}
          onAdd={openAdd}
          onEdit={openEdit}
          onDelete={openDelete}
        />
      </div>
      <ShoppingListItemModal
        item={formItem}
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        onSave={handleSave}
      />
      <DeleteShoppingListItemModal
        item={deletingItem}
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        onConfirm={handleDelete}
      />
    </>
  )
}
