import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import Calculadora from '../src/components/HelloWorld.vue'
import * as funciones from '../src/components/funciones.js'

describe('HelloWorld.vue', () => {

  it('calcula errores correctamente y muestra la tabla', async () => {
    
    const errorAbs = 2
    const errorRel = 0.5
    const spyAbs = vi.spyOn(funciones, 'errorAbsoluto').mockReturnValue(errorAbs)
    const spyRel = vi.spyOn(funciones, 'errorRelativo').mockReturnValue(errorRel)

    const wrapper = mount(Calculadora)

    
    await wrapper.find('input[placeholder="Ingresa valor real"]').setValue(4)
    await wrapper.find('input[placeholder="Ingresa valor aproximado"]').setValue(2)

    
    await wrapper.find('button').trigger('click')

    expect(spyAbs).toHaveBeenCalledWith(4,2)
    expect(spyRel).toHaveBeenCalledWith(errorAbs, 4)
    expect(wrapper.vm.mostrarTabla).toBe(true)
    expect(wrapper.vm.eAbsoluto).toBe(errorAbs)
    expect(wrapper.vm.eRelativo).toBe(errorRel)
  })

  it('muestra alerta si faltan datos', async () => {
    const wrapper = mount(Calculadora)

    
    await wrapper.find('button').trigger('click')

    expect(wrapper.vm.mostrarAlerta).toBe(true)
  })

  it('cierra la alerta correctamente', async () => {
    const wrapper = mount(Calculadora)
    wrapper.vm.mostrarAlerta = true

    wrapper.vm.cerrarAlerta()
    expect(wrapper.vm.mostrarAlerta).toBe(false)
  })

  it('bloquea teclas inválidas', () => {
    const wrapper = mount(Calculadora)

    const event = { key: 'e', preventDefault: vi.fn() }
    wrapper.vm.bloquearTeclas(event)
    expect(event.preventDefault).toHaveBeenCalled()
  })

  it('permite teclas válidas', () => {
    const wrapper = mount(Calculadora)

    const event = { key: '5', preventDefault: vi.fn() }
    wrapper.vm.bloquearTeclas(event)
    expect(event.preventDefault).not.toHaveBeenCalled()
  })

})
