import DynamicPrivacySettingsManager from "@/components/privacySettingsManager";

export const REACTMARKDOWNCOMPONENTS = {
  p: ({ children }) =>
    children[0] === "<<PRIVACY_MANAGER>>" ? (
      <DynamicPrivacySettingsManager />
    ) : (
      <p className="pb-2">{children}</p>
    ),
  a: ({ href, children }) => (
    <a
      href={href}
      className="text-blue-primary"
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  ),
  ul: ({ children }) => <ul className="pl-4 my-2 list-disc">{children}</ul>,
  img: ({ src, alt }) => {
    let width = alt.split("|")[1];
    return <img src={src} width={width ? width : 300} alt={alt[0]} className="block py-4 mx-auto" />;
  },
};
