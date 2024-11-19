import { Subject } from 'rxjs';
import config from '../config/environment';

class LoadingService {
  constructor() {
    this.loadingState = new Subject();
    this.progress = new Subject();
    this.initialLoadComplete = false;
    this.resourcesLoaded = new Set();
    this.totalResources = 4;
  }

  startInitialLoad() {
    if (this.initialLoadComplete) return;

    return new Promise(resolve => {
      this.loadingState.next({ type: 'INITIAL_LOAD_START' });

      const resources = [
        this.loadPiCalculationEngine(),
        this.loadAIService(),
        this.loadDigitStream(),
        this.loadUserPreferences(),
      ];

      Promise.all(resources).then(() => {
        this.initialLoadComplete = true;
        this.loadingState.next({ type: 'INITIAL_LOAD_COMPLETE' });
        resolve();
      });
    });
  }

  async loadPiCalculationEngine() {
    await this.simulateLoading('PI_ENGINE', 1000);
  }

  async loadAIService() {
    await this.simulateLoading('AI_SERVICE', 800);
  }

  async loadDigitStream() {
    await this.simulateLoading('DIGIT_STREAM', 500);
  }

  async loadUserPreferences() {
    await this.simulateLoading('PREFERENCES', 300);
  }

  async simulateLoading(resourceName, duration) {
    if (config.isDevelopment) {
      await new Promise(resolve => setTimeout(resolve, duration));
    }
    this.resourcesLoaded.add(resourceName);
    this.progress.next(this.resourcesLoaded.size / this.totalResources);
  }

  onLoadingStateChange(callback) {
    return this.loadingState.subscribe(callback);
  }

  onProgressChange(callback) {
    return this.progress.subscribe(callback);
  }
}

export const loadingService = new LoadingService();
export default loadingService;
