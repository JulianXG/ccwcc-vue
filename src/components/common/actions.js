/**
 * Created by Julian on 2016/8/30.
 */
export function toggleTab (index) {
    let tabs = this.tabs;
    for (let i = 0; i < tabs.length; i++) {
        tabs[i].isActive = i === index;
    }
}
