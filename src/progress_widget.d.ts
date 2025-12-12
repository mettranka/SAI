/**
 * Progress Widget Module
 * Manages a global loading indicator for image generation
 * Shows progress for all messages in a fixed position above the user input area
 *
 * Architecture: View layer that subscribes to ProgressManager events
 * - Listens to progress:started, progress:updated, progress:cleared
 * - Throttles DOM updates to prevent thrashing
 * - Shows success/failure breakdown
 * - No business logic, purely presentational
 */
import type { ProgressManager } from './progress_manager';
/**
 * Initializes the progress widget with a ProgressManager
 * Should be called once during extension initialization
 * @param manager - ProgressManager instance to subscribe to
 */
export declare function initializeProgressWidget(manager: ProgressManager): void;
/**
 * Clears the progress widget state (called when chat changes)
 * Removes all message progress and hides the widget
 */
export declare function clearProgressWidgetState(): void;
