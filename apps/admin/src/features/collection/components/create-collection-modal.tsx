import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import { useCreateCollection } from '@/services/api';
import { sharedStyles } from '@/styles/shared-styles';
import { FormInput, FormTextarea, FormCheckbox } from '@/components/ui';

type CreateCollectionModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
};

export const CreateCollectionModal = ({
  isOpen,
  onClose,
  onSuccess,
}: CreateCollectionModalProps) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isPublic, setIsPublic] = useState(false);

  const createCollection = useCreateCollection();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      await createCollection.mutateAsync({
        name: name.trim(),
        description: description.trim() || undefined,
        isPublic,
      });

      // Reset form
      setName('');
      setDescription('');
      setIsPublic(false);

      onSuccess?.();
      onClose();
    } catch (error) {
      console.error('Failed to create collection:', error);
      alert('Failed to create collection');
    }
  };

  const handleClose = () => {
    setName('');
    setDescription('');
    setIsPublic(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={handleClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative rounded-2xl bg-gray-900/25 backdrop-blur-2xl border border-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.5)] w-full max-w-md before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/5 before:to-transparent before:pointer-events-none before:rounded-2xl"
          >
            <div className="p-8">
              <h2 className="text-xl font-display font-bold text-sun mb-6 tracking-wide">
                Create New Collection
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <FormInput
                  id="name"
                  label="Collection Name *"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter collection name"
                  required
                />

                <FormTextarea
                  id="description"
                  label="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  placeholder="Optional description"
                />

                <FormCheckbox
                  id="isPublic"
                  label="Make this collection public"
                  checked={isPublic}
                  onChange={(e) => setIsPublic(e.target.checked)}
                />

                <div className="flex gap-3 pt-4 justify-center">
                  <button
                    type="button"
                    onClick={handleClose}
                    className={clsx(sharedStyles.buttonSecondary)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={!name.trim() || createCollection.isPending}
                    className={clsx(sharedStyles.buttonPrimary)}
                  >
                    {createCollection.isPending ? 'Creating...' : 'Create'}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
