import { browser } from '$app/environment';
import { AppError, ErrorCode } from '$lib/errors';
import { get } from 'svelte/store';
import { localStorageEnabled } from '$lib/stores';

export abstract class BaseService<T extends { id: string }, F> {
    protected items: T[] = [];
    protected storageKey: string;

    protected constructor(storageKey: string) {
        this.storageKey = storageKey;
        this.load();
        if (browser) {
            localStorageEnabled.subscribe((enabled) => {
                if (!enabled) {
                    localStorage.removeItem(this.storageKey);
                }
            });
        }
    }

    protected abstract getDefaults(): T[];

    public abstract get(filter?: F): T[];

    private load(): void {
        if (!browser) {
            this.items = [];
            return;
        }

        if (!get(localStorageEnabled)) {
            this.items = this.getDefaults();
            return;
        }

        const stored = localStorage.getItem(this.storageKey);
        if (stored) {
            this.items = JSON.parse(stored);
        } else {
            this.items = this.getDefaults();
            this.save();
        }
    }

    private save(): void {
        if (browser && get(localStorageEnabled)) {
            localStorage.setItem(this.storageKey, JSON.stringify(this.items));
        }
    }

    public add(item: Omit<T, 'id'>): T {
        const newItem = {
            ...item,
            id: crypto.randomUUID()
        } as T;
        this.items = [...this.items, newItem];
        this.save();
        return newItem;
    }

    public delete(id: string): void {
        const index = this.items.findIndex(item => item.id === id);
        if (index === -1) {
            throw new AppError(ErrorCode.ITEM_NOT_FOUND);
        }
        this.items = this.items.filter(item => item.id !== id);
        this.save();
    }

    public update(updatedItem: T): void {
        if (!updatedItem.id) {
            throw new AppError(ErrorCode.MISSING_ID);
        }
        const index = this.items.findIndex(item => item.id === updatedItem.id);
        if (index === -1) {
            throw new AppError(ErrorCode.ITEM_NOT_FOUND);
        }
        this.items = this.items.map(item => item.id === updatedItem.id ? updatedItem : item);
        this.save();
    }
}
