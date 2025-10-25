// Dynamic Task Form Component
// TODO: Implement complex form with React Hook Form

import React, { useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { TASK_TYPES, PRIORITIES, BUG_SEVERITIES, STATUSES } from '../api/mockApi';

// TODO: Implement TaskForm component
// Requirements:
// 1. Dynamic fields based on task type
// 2. Form validation with custom rules
// 3. Field arrays for subtasks and acceptance criteria
// 4. Integration with Redux for data and state
// 5. Auto-save functionality
// 6. File attachment simulation

const TaskForm = ({
  isOpen,
  mode = 'create',
  initialData = null,
  onSubmit,
  onClose,
  users = [],
  projects = [],
  loading = false
}) => {
  const { register, control, handleSubmit, watch, reset, formState } = useForm({
    defaultValues: {
      title: '',
      description: '',
      taskType: TASK_TYPES[0],
      priority: PRIORITIES[1],
      status: STATUSES[0],
      projectId: projects.length ? projects[0].id : '',
      assigneeId: '',
      dueDate: '',
      subtasks: [],
      acceptanceCriteria: [],
      severity: BUG_SEVERITIES[1],
      stepsToReproduce: ''
    }
  });

  const { errors, isValid } = formState;

  const { fields: subtaskFields, append: appendSubtask, remove: removeSubtask } = useFieldArray({
    control,
    name: 'subtasks'
  });

  const { fields: criteriaFields, append: appendCriteria, remove: removeCriteria } = useFieldArray({
    control,
    name: 'acceptanceCriteria'
  });

  const taskType = watch('taskType');

  // When editing, populate the form
  useEffect(() => {
    if (initialData) {
      reset({
        ...initialData,
        dueDate: initialData.dueDate || ''
      });
    } else {
      // If projects available, set default project
      reset((prev) => ({ ...prev, projectId: projects.length ? projects[0].id : '' }));
    }
  }, [initialData, projects, reset]);

  const handleLocalSubmit = async (data) => {
    if (onSubmit) {
      await onSubmit(data);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="task-form-overlay" style={overlayStyle}>
      <div className="task-form" style={formStyle}>
        <div className="task-form-header" style={headerStyle}>
          <h2>{mode === 'create' ? 'Create New Task' : 'Edit Task'}</h2>
          <button onClick={onClose} aria-label="close">×</button>
        </div>

        <form onSubmit={handleSubmit(handleLocalSubmit)}>
          <div className="form-row">
            <div className="form-group">
              <label>Title *</label>
              <input {...register('title', { required: 'Title is required' })} />
              {errors.title && <div className="error">{errors.title.message}</div>}
            </div>

            <div className="form-group">
              <label>Task Type *</label>
              <select {...register('taskType')}>
                {TASK_TYPES.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Priority</label>
              <select {...register('priority')}>
                {PRIORITIES.map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Status</label>
              <select {...register('status')}>
                {STATUSES.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Project</label>
              <select {...register('projectId')}>
                <option value="">-- Select Project --</option>
                {projects.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Assignee</label>
              <select {...register('assigneeId')}>
                <option value="">Unassigned</option>
                {users.map(u => (
                  <option key={u.id} value={u.id}>{u.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea {...register('description')} rows={4} />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Due Date</label>
              <input type="date" {...register('dueDate')} />
            </div>
          </div>

          {/* Dynamic Fields */}
          {taskType === 'Bug' && (
            <div className="form-group">
              <label>Severity</label>
              <select {...register('severity')}>
                {BUG_SEVERITIES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>

              <label style={{ marginTop: 8 }}>Steps to Reproduce</label>
              <textarea {...register('stepsToReproduce')} rows={3} />
            </div>
          )}

          {taskType === 'Feature' && (
            <div className="form-group">
              <label>Acceptance Criteria</label>
              {criteriaFields.map((f, idx) => (
                <div key={f.id} style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
                  <input
                    {...register(`acceptanceCriteria.${idx}`)}
                    placeholder={`Criteria ${idx + 1}`}
                    style={{ flex: 1 }}
                  />
                  <button type="button" onClick={() => removeCriteria(idx)}>Remove</button>
                </div>
              ))}
              <button type="button" onClick={() => appendCriteria('')}>Add Criteria</button>
            </div>
          )}

          {/* Subtasks */}
          <div className="form-group">
            <label>Subtasks</label>
            {subtaskFields.map((f, idx) => (
              <div key={f.id} style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
                <input {...register(`subtasks.${idx}.title`)} placeholder={`Subtask ${idx + 1}`} style={{ flex: 1 }} />
                <label>
                  <input type="checkbox" {...register(`subtasks.${idx}.completed`)} /> Done
                </label>
                <button type="button" onClick={() => removeSubtask(idx)}>Remove</button>
              </div>
            ))}
            <button type="button" onClick={() => appendSubtask({ title: '', completed: false, id: `sub_${Date.now()}` })}>Add Subtask</button>
          </div>

          <div className="form-actions" style={{ marginTop: 12, display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <button type="button" onClick={onClose}>Cancel</button>
            <button type="submit" disabled={loading || !isValid}>{loading ? 'Saving...' : mode === 'create' ? 'Create Task' : 'Update Task'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;

// Inline minimal styles to avoid touching global CSS for now
const overlayStyle = {
  position: 'fixed',
  inset: 0,
  background: 'rgba(0,0,0,0.35)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1200
};

const formStyle = {
  width: '760px',
  maxHeight: '90vh',
  overflow: 'auto',
  background: '#fff',
  borderRadius: 6,
  padding: 18,
  boxShadow: '0 10px 30px rgba(0,0,0,0.15)'
};

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 8
};