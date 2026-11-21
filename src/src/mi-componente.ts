import * as ecs from '@8thwall/ecs'

// Gira sobre su eje el objeto al que se le adjunte este componente.
// El schema genera el formulario del Inspector automáticamente.
ecs.registerComponent({
  name: 'mi-componente',
  schema: {
    velocidad: ecs.f32,
    eje: ecs.string,
    activo: ecs.boolean,
  },
  schemaDefaults: {
    velocidad: 1,
    eje: 'y',
    activo: true,
  },
  tick: (world, component) => {
    const {velocidad, eje, activo} = component.schema
    if (!activo) {
      return
    }

    const angulo = (world.time.elapsed / 1000) * velocidad
    const mitad = Math.sin(angulo / 2)
    const resto = Math.cos(angulo / 2)

    // Cuaternión unitario de un giro sobre el eje elegido (por defecto Y).
    ecs.Quaternion.set(world, component.eid, {
      x: eje === 'x' ? mitad : 0,
      y: eje === 'y' ? mitad : 0,
      z: eje === 'z' ? mitad : 0,
      w: resto,
    })
  },
  remove: (world, component) => {
    // Al quitar el componente, devolvemos el objeto a su orientación neutra.
    ecs.Quaternion.set(world, component.eid, {x: 0, y: 0, z: 0, w: 1})
  },
})
