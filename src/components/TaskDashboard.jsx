// Main Dashboard Component
// TODO: Implement the main container component

import React, { useEffect, useState } from 'react';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import FilterBar from './FilterBar';
import { mockApi } from '../api/mockApi';

// TODO: Import selectors and actions
// import { 
//   selectAllTasks,
//   selectFilteredTasks,
//   selectTaskFormState,
//   selectUsers,
//   selectProjects,
//   selectFilters,
//   selectLoading,
//   selectErrors
// } from '../store/selectors';

// import {
//   fetchTasksRequest,
//   createTaskRequest,
//   updateTaskRequest,
//   deleteTaskRequest,
//   openTaskForm,
//   closeTaskForm,
//   setFilters
// } from '../store/actions';

const TaskDashboard = () => {
  // Local state instead of Redux for now (store implementation is placeholder)
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState('create');
  const [formInitialData, setFormInitialData] = useState(null);

  // Fetch initial data
  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      try {
        const [tasksRes, usersRes, projectsRes] = await Promise.all([
          mockApi.fetchTasks(),
          mockApi.fetchUsers(),
          mockApi.fetchProjects()
        ]);

        if (!mounted) return;

        setTasks(tasksRes.data || []);
        setUsers(usersRes.data || []);
        setProjects(projectsRes.data || []);
      } catch (err) {
        console.error('Failed to load data', err);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();

    return () => { mounted = false; };
  }, []);

  const handleCreateTask = () => {
    setFormMode('create');
    setFormInitialData(null);
    setIsFormOpen(true);
  };

  const handleEditTask = (taskId) => {
    const t = tasks.find(x => x.id === taskId);
    if (!t) return;
    setFormMode('edit');
    setFormInitialData(t);
    setIsFormOpen(true);
  };

  const handleDeleteTask = async (taskId) => {
    if (!confirm('Delete this task?')) return;
    try {
      setLoading(true);
      await mockApi.deleteTask(taskId);
      setTasks(prev => prev.filter(t => t.id !== taskId));
    } catch (err) {
      console.error('Failed to delete', err);
      alert('Failed to delete task');
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      setLoading(true);
      if (formMode === 'create') {
        const res = await mockApi.createTask(formData);
        setTasks(prev => [res.data, ...prev]);
      } else if (formMode === 'edit' && formInitialData) {
        const res = await mockApi.updateTask(formInitialData.id, formData);
        setTasks(prev => prev.map(t => t.id === res.data.id ? res.data : t));
      }
      setIsFormOpen(false);
    } catch (err) {
      console.error('Failed to save task', err);
      alert('Failed to save task');
    } finally {
      setLoading(false);
    }
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setFormInitialData(null);
  };

  const handleFiltersChange = (newFilters) => {
    // For now, simple filter: refetch from mockApi with filters
    (async () => {
      setLoading(true);
      try {
        const res = await mockApi.fetchTasks(newFilters || {});
        setTasks(res.data || []);
      } catch (err) {
        console.error('Filter fetch failed', err);
      } finally {
        setLoading(false);
      }
    })();
  };

  return (
    <div className="task-dashboard">
      <header className="dashboard-header" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <h1>Task Management Dashboard</h1>
        <button
          className="create-task-btn"
          onClick={handleCreateTask}
          style={{ padding: '8px 12px', borderRadius: 6, background: '#0ea5e9', color: '#fff', border: 'none' }}
        >
          + Create Task
        </button>
      </header>

      {/* TODO: Show error messages */}
      {/* {errors.tasks && (
        <div className="error-banner">
          Error: {errors.tasks}
        </div>
      )} */}

      <FilterBar
        projects={projects}
        users={users}
        onFiltersChange={handleFiltersChange}
      />

      <TaskList
        tasks={tasks}
        loading={loading}
        onEditTask={handleEditTask}
        onDeleteTask={handleDeleteTask}
      />

      <TaskForm
        isOpen={isFormOpen}
        mode={formMode}
        initialData={formInitialData}
        users={users}
        projects={projects}
        loading={loading}
        onSubmit={handleFormSubmit}
        onClose={handleFormClose}
      />
    </div>
  );
};

export default TaskDashboard;