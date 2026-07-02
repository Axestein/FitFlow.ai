import React, { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Plus, Trash2, GripVertical } from 'lucide-react';

// Sortable Item Component
const SortableItem = ({ id, children, onDelete }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-lg mb-2 hover:bg-white/10 transition ${isDragging ? 'shadow-2xl' : ''}`}
    >
      <div {...attributes} {...listeners} className="cursor-grab">
        <GripVertical className="h-5 w-5 text-gray-400" />
      </div>
      <span className="flex-1 text-white">{children}</span>
      <button
        onClick={() => onDelete(id)}
        className="text-gray-400 hover:text-red-400 transition"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
};

const KanbanFlow = () => {
  const [items, setItems] = useState([
    'Morning Workout',
    'Track Calories',
    'Drink 8 Glasses Water',
    'Evening Stretch',
  ]);
  const [newItem, setNewItem] = useState('');

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = items.indexOf(active.id);
      const newIndex = items.indexOf(over.id);

      setItems((items) => arrayMove(items, oldIndex, newIndex));
    }
  };

  const handleAddItem = () => {
    if (newItem.trim()) {
      setItems([...items, newItem.trim()]);
      setNewItem('');
    }
  };

  const handleDeleteItem = (id) => {
    setItems(items.filter((item) => item !== id));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddItem();
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-white mb-6">Plan Your Day</h2>
        <p className="text-gray-400 mb-6">Drag and drop to prioritize your tasks</p>

        {/* Add New Item */}
        <div className="flex gap-3 mb-6">
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Add a new task..."
            className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-emerald-400"
          />
          <button
            onClick={handleAddItem}
            className="px-4 py-2 bg-gradient-to-r from-emerald-400 to-cyan-400 text-black font-medium rounded-lg hover:shadow-lg hover:shadow-emerald-400/30 transition-all"
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>

        {/* Sortable List */}
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={items}
            strategy={verticalListSortingStrategy}
          >
            {items.map((item) => (
              <SortableItem
                key={item}
                id={item}
                onDelete={handleDeleteItem}
              >
                {item}
              </SortableItem>
            ))}
          </SortableContext>
        </DndContext>

        {items.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No tasks yet. Add some to get started!
          </div>
        )}

        <div className="mt-4 text-xs text-gray-500 text-center">
          {items.length} tasks • Drag to reorder
        </div>
      </div>
    </div>
  );
};

export default KanbanFlow;