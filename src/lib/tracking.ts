import { supabase } from './supabaseClient'

export const trackEvent = async (
  eventType: string,
  options?: { leadId?: string; page?: string; metadata?: Record<string, any> }
) => {
  try {
    const { error } = await supabase.from('events').insert({
      lead_id: options?.leadId || null,
      event_type: eventType,
      page: options?.page || window.location.pathname,
      metadata: options?.metadata || {}
    })
    if (error) console.error('Error tracking event:', error)
  } catch (err) {
    console.error('Error in trackEvent:', err)
  }
}
