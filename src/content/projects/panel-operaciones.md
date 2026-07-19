---
title: Panel de operaciones
description: "Seguimiento interno de entregas, estados y bloqueos de equipo."
year: 2025
stack: [React, Node.js, PostgreSQL]
status: archivo
---

Dashboard interno para visualizar el estado de entregas en un equipo pequeño de producto.

## Problema

Los updates semanales en Slack se perdían. Nadie tenía una vista única de qué estaba bloqueado, qué salía esta semana y qué quedó colgado del sprint anterior.

## Solución

Un panel con:

- **Kanban por estado** (pendiente → en curso → revisión → hecho)
- **Filtros por persona y prioridad**
- **Historial de cambios** para auditoría ligera

## Aprendizajes

- Menos features, más claridad en los estados
- La UI interna también merece criterio de diseño
- PostgreSQL + API REST simple > over-engineering

## Estado

Archivado. Las ideas útiles migraron a otras herramientas del equipo.
